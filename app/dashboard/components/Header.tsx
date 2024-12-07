export default function Header({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-[#14151A] font-inter text-[22px] font-semibold leading-[32px] tracking-[-0.308px]">
        {title}
      </h1>
      <p className="text-[rgba(15,19,36,0.60)] font-inter text-[14px] font-normal leading-[20px] tracking-[-0.07px]">
        {description}
      </p>
    </div>
  );
} 