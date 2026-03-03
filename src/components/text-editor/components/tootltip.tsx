import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
};

export function Tooltip({ children, content }: TooltipProps) {
  return (
    <ShadcnTooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>

      <TooltipContent side={'bottom'}>{content}</TooltipContent>
    </ShadcnTooltip>
  );
}
