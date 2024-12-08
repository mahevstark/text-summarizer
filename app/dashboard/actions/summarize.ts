'use server'

import OpenAI from 'openai';
import { prisma } from '../../lib/db';
import { checkAuth } from '../../actions/auth';
import { EditingSummary } from '../history/store/summary-store';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

type SummaryError = {
  error: {
    title: string;
    message: string;
  }
};

type SummarySuccess = {
  summary: string;
  savedSummary: {
    id: number;
    userText: string;
    summary: string;
    wordCount: number;
    characterCount: number;
    createdAt: Date;
  }
};

type SummaryResponse = SummaryError | SummarySuccess;

export async function summarize(text: string, editingSummary: EditingSummary | null): Promise<SummaryResponse> {
  try {
    // Check if user is authenticated
    const user = await checkAuth();
    if (!user) {
      return {
        error: {
          title: "Authentication Error",
          message: "You must be logged in to create summaries"
        }
      };
    }

    // Validate input
    if (!text || text.trim().length === 0) {
      return {
        error: {
          title: "Validation Error",
          message: "Please provide text to summarize"
        }
      };
    }

    // Generate summary using OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates concise summaries of text while maintaining the key points and context."
        },
        {
          role: "user",
          content: `Please summarize the following text:\n\n${text}`
        }
      ],
      model: "gpt-3.5-turbo",
    });

    const summary = completion.choices[0]?.message?.content;
    
    if (!summary) {
      throw new Error("Failed to generate summary");
    }

    let savedSummary;

    if(editingSummary) {
      const updatedSummary = await prisma.summary.update({
        where: { id: editingSummary.id, userId: user.id },
        data: { summary: summary, userText: text, wordCount: text.split(/\s+/).length, characterCount: text.length }
      });
      savedSummary = updatedSummary;
    } else {
      // Save to database
      savedSummary = await prisma.summary.create({
      data: {
        userText: text,
        summary: summary,
        wordCount: text.split(/\s+/).length,
        characterCount: text.length,
          userId: user.id
        }
      });
    }

    return { 
      summary: savedSummary.summary,
      savedSummary: {
        id: savedSummary.id,
        userText: savedSummary.userText,
        summary: savedSummary.summary,
        wordCount: savedSummary.wordCount,
        characterCount: savedSummary.characterCount,
        createdAt: savedSummary.createdAt
      }
    };

  } catch (error) {
    console.error('Summary generation error:', error);
    return {
      error: {
        title: "Server Error",
        message: "Failed to generate summary"
      }
    };
  }
}
