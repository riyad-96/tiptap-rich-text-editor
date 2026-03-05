import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEditorProvider } from '../hooks/use-editor-provider';

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
  side = 'bottom',
}: TooltipProps) {
  const { hideTooltip } = useEditorProvider();

  return (
    <ShadcnTooltip>
      <TooltipTrigger asChild disabled={disabled}>
        {children}
      </TooltipTrigger>

      <TooltipContent hidden={Boolean(hideTooltip)} side={side}>
        {content}
      </TooltipContent>
    </ShadcnTooltip>
  );
}
