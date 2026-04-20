import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { getBotTemplateQueryFn } from '@/api/queries/bot-template.query';
import {
  createBotTemplateMutationFn,
  updateBotTemplateMutationFn,
} from '@/api/mutations';
import { TBotTemplateForm, IBotTemplate } from '@/types/bot-template.types';

interface UseBotTemplateOptions {
  botId: string;
  enabled?: boolean;
}

export const useBotTemplate = ({ botId, enabled = true }: UseBotTemplateOptions) => {
  const { t } = useTranslation();

  const query = useQuery({
    queryKey: ['bot-template', botId],
    queryFn: () => getBotTemplateQueryFn(botId),
    enabled: enabled && Boolean(botId),
  });

  const createMutation = useMutation({
    mutationFn: (data: TBotTemplateForm) =>
      createBotTemplateMutationFn({ ...data, botId }),
    onSuccess: () => {
      toast.success(t('common.success'));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: TBotTemplateForm) =>
      updateBotTemplateMutationFn(botId, data),
    onSuccess: () => {
      toast.success(t('common.success'));
    },
  });

  const isLoading = query.isLoading || createMutation.isPending || updateMutation.isPending;
  const isExisting = !!query.data;

  return {
    template: query.data,
    isLoading,
    isExisting,
    refetch: query.refetch,
    createTemplate: createMutation.mutate,
    updateTemplate: updateMutation.mutate,
  };
};
