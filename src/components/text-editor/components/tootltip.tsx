import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  side?: 'top' | 'left' | 'right' | 'bottom';
};

export function Tooltip({
  children,
  content,
  disabled,
  side = 'top',
}: TooltipProps) {
  return (
    <ShadcnTooltip>
      <TooltipTrigger asChild disabled={disabled}>
        {children}
      </TooltipTrigger>

      <TooltipContent side={side}>{content}</TooltipContent>
    </ShadcnTooltip>
  );
}
