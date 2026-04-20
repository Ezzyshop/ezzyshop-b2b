import { useForm, useFieldArray } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TBotTemplateForm, ButtonAction, ButtonType } from '@/types/bot-template.types';
import { telegramSettingsResolver } from '../utils/telegram-settings.validator';
import {
  createBotTemplateMutationFn,
  updateBotTemplateMutationFn,
} from '@/api/mutations';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib';

interface IProps {
  initialValues: TBotTemplateForm;
  botId: string;
  refetch: () => void;
  isExisting: boolean;
}

const buttonActions: ButtonAction[] = ['menu', 'orders', 'feedback', 'language'];
const buttonTypes: ButtonType[] = ['callback', 'url'];

export const TelegramSettingsForm = ({
  initialValues,
  botId,
  refetch,
  isExisting,
}: IProps) => {
  const { t } = useTranslation();
  const form = useForm<TBotTemplateForm>({
    defaultValues: initialValues,
    resolver: joiResolver(telegramSettingsResolver),
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'buttons',
  });

  const createMutation = useMutation({
    mutationFn: (data: TBotTemplateForm) =>
      createBotTemplateMutationFn({ ...data, botId }),
    onSuccess: () => {
      toast.success(t('common.success'));
      refetch();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: TBotTemplateForm) =>
      updateBotTemplateMutationFn(botId, data),
    onSuccess: () => {
      toast.success(t('common.success'));
      refetch();
    },
  });

  const handleSubmit = (data: TBotTemplateForm) => {
    if (isExisting) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleAddButton = () => {
    append({
      text: '',
      action: 'menu',
      type: 'callback',
      order: fields.length,
    });
  };

  const handleRemoveButton = (index: number) => {
    remove(index);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="welcomeMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>
                  {t('dashboard.telegram-settings.welcome-message')}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={t(
                      'dashboard.telegram-settings.welcome-message-placeholder'
                    )}
                    className="min-h-[100px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="menuHintText"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired>
                  {t('dashboard.telegram-settings.menu-hint-text')}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t(
                      'dashboard.telegram-settings.menu-hint-text-placeholder'
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              {t('dashboard.telegram-settings.buttons')}
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddButton}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('dashboard.telegram-settings.add-button')}
            </Button>
          </div>

          <div className="space-y-3">
            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {t('dashboard.telegram-settings.no-buttons')}
              </p>
            )}
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-start gap-3 p-3 border rounded-lg bg-muted/50"
              >
                <div className="mt-2 cursor-move">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <FormField
                    control={form.control}
                    name={`buttons.${index}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t('dashboard.telegram-settings.button-text')}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`buttons.${index}.action`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t('dashboard.telegram-settings.button-action')}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {buttonActions.map((action) => (
                              <SelectItem key={action} value={action}>
                                {t(
                                  `dashboard.telegram-settings.actions.${action}`
                                )}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`buttons.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t('dashboard.telegram-settings.button-type')}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {buttonTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {t(
                                  `dashboard.telegram-settings.button-types.${type}`
                                )}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-6"
                  onClick={() => handleRemoveButton(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={
            !form.formState.isDirty ||
            !form.formState.isValid ||
            createMutation.isPending ||
            updateMutation.isPending
          }
          className={cn(createMutation.isPending || updateMutation.isPending
            ? 'opacity-70'
            : '')}
        >
          {t('common.save')}
        </Button>
      </form>
    </Form>
  );
};
