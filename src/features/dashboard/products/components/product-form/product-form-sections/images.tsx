import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImageIcon, Plus, Trash2 } from "lucide-react";
import { IProductForm } from "../../../utils/product.interface";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface IProps {
  form: UseFormReturn<IProductForm, unknown, IProductForm>;
}

export const ProductFormImages = ({ form }: IProps) => {
  const [newImageUrl, setNewImageUrl] = useState("");

  const addImage = () => {
    if (newImageUrl.trim()) {
      const currentImages = form.getValues("images") || [];
      if (currentImages.length < 10) {
        form.setValue("images", [...currentImages, newImageUrl.trim()]);
        setNewImageUrl("");
      }
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images") || [];
    form.setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );
  };

  const images = form.watch("images") || [];

  return (
    <Card className="p-3 gap-2">
      <h3 className="text-lg font-semibold mb-2">Images (Max 10)</h3>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={addImage}
            disabled={
              !newImageUrl.trim() ||
              (form.getValues("images")?.length || 0) >= 10
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </div>

        {images.length > 0 && (
          <div className="space-y-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 border rounded"
              >
                <ImageIcon className="w-4 h-4 text-gray-500" />
                <span className="flex-1 text-sm truncate">{image}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeImage(index)}
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
