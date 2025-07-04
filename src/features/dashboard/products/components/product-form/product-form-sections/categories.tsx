import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IProductForm } from "../../../utils/product.interface";
import { UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface IProps {
  form: UseFormReturn<IProductForm, unknown, IProductForm>;
}

export const ProductFormCategories = ({ form }: IProps) => {
  const [newCategoryId, setNewCategoryId] = useState("");

  const categories = form.watch("categories") ?? [];

  const addCategory = () => {
    if (newCategoryId.trim()) {
      const currentCategories = form.getValues("categories") || [];
      if (!currentCategories.includes(newCategoryId.trim())) {
        form.setValue("categories", [
          ...currentCategories,
          newCategoryId.trim(),
        ]);
        setNewCategoryId("");
      }
    }
  };

  const removeCategory = (index: number) => {
    const currentCategories = form.getValues("categories") || [];
    form.setValue(
      "categories",
      currentCategories.filter((_, i) => i !== index)
    );
  };

  return (
    <Card className="p-3 gap-2">
      <h3 className="text-lg font-semibold mb-2">Categories</h3>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newCategoryId}
            onChange={(e) => setNewCategoryId(e.target.value)}
            placeholder="Enter category ID (24 characters)"
            maxLength={24}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={addCategory}
            disabled={!newCategoryId.trim() || newCategoryId.length !== 24}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>

        {categories.length > 0 && (
          <div className="space-y-2">
            {categories.map((categoryId, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 border rounded"
              >
                <span className="flex-1 text-sm font-mono">{categoryId}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeCategory(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
