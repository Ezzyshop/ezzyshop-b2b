import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { IUserForm } from "@/lib/interfaces";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRoles } from "@/lib/enums";
import { userRolesTranslations } from "@/lib/enums";
import { useState } from "react";

interface IProps {
  form: UseFormReturn<IUserForm>;
}

export const UserFormBasicInformation = ({ form }: IProps) => {
  const [rolesOpen, setRolesOpen] = useState(false);

  const handleRoleToggle = (role: UserRoles) => {
    const currentRoles = form.getValues("roles");
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter((r) => r !== role)
      : [...currentRoles, role];
    form.setValue("roles", newRoles);
  };
  return (
    <Card className="p-4 grid grid-cols-2 gap-4">
      <h3 className="text-lg font-medium col-span-2">Asosiy Ma'lumotlar</h3>

      <FormField
        control={form.control}
        name="full_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel isRequired>To'liq Ism</FormLabel>
            <FormControl>
              <Input placeholder="To'liq ismni kiriting" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Email manzilini kiriting"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefon Raqam</FormLabel>
            <FormControl>
              <Input
                placeholder="Telefon raqamini kiriting"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="photo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rasm URL</FormLabel>
            <FormControl>
              <Input
                placeholder="Rasm URL manzilini kiriting"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="roles"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Rollar</FormLabel>
            <Popover open={rolesOpen} onOpenChange={setRolesOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "justify-between",
                      !field.value?.length && "text-muted-foreground"
                    )}
                  >
                    {field.value?.length
                      ? field.value
                          .map((value) => userRolesTranslations[value])
                          .join(", ")
                      : "Rollarni tanlang"}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Rol qidirish..." />
                  <CommandEmpty>Hech qanday rol topilmadi.</CommandEmpty>
                  <CommandGroup>
                    {Object.values(UserRoles).map((role) => (
                      <CommandItem
                        key={role}
                        onSelect={() => handleRoleToggle(role)}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value?.includes(role)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {userRolesTranslations[role]}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
};
