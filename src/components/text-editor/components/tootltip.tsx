import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

export function Tooltip({ children, content, disabled }: TooltipProps) {
  return (
    <ShadcnTooltip>
      <TooltipTrigger asChild disabled={disabled}>
        {children}
      </TooltipTrigger>

      <TooltipContent side={'bottom'}>{content}</TooltipContent>
    </ShadcnTooltip>
  );
}
