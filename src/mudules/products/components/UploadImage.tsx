'use client';
import { Button, Field, FieldLabel, Input } from '@/components/ui';
import { PrismaType } from '@/lib/prisma';
import { CircleX, Upload } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  deleteImage,
  getImages,
  uploadImageToServer,
} from '../services/imageService';
import { Spinner } from '@/components/Spinner';
const UploadImage: FC<{ productId: string }> = ({ productId }) => {
  const [isPenling, setIsPending] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [images, setImages] = useState<PrismaType.Image[] | null>(null);
  const handleSubmitImage = async () => {
    setIsPending(true);
    if (!image || !productId) {
      alert('please select image');
    } else {
      const data = await uploadImageToServer(image!, productId);

      const newImages = images ? [...images, data] : [data];

      setImages(newImages);
    }
    setIsPending(false);
  };
  const handleSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setImage(file);
    }
  };

  const handleDeleteImage = async (id: string) => {
    await deleteImage(id);
    setImages((prev) => prev?.filter((image) => image.id !== id) || null);
  };
  useEffect(() => {
    const fetchImages = async () => {
      const data = await getImages(productId);
      setImages(data);
    };
    fetchImages();
  }, [productId]);

  if (isPenling) return <Spinner />;
  return (
    <div className="flex flex-col gap-2 justify-center">
      <Field>
        <FieldLabel htmlFor="image">Select Image</FieldLabel>
        <Input
          type="file"
          accept="image/*"
          id="image"
          onChange={handleSelectImage}
        />
      </Field>
      <Button type="button" className="w-full" onClick={handleSubmitImage}>
        Uploade <Upload />
      </Button>
      <div className="w-full flex justify-center gap-2 flex-wrap">
        {!isPenling &&
          images &&
          images.map((image) => (
            <div key={image.id} className="relative  w-25 h-25 ">
              <Image
                src={image.image}
                alt={image.image}
                className="rounded-lg  object-cover"
                fill
              />
              <CircleX
                onClick={() => handleDeleteImage(image.id)}
                className="absolute top-1 left-1 text-red-600 text-2xl duration-300 transition-all hover:scale-90 cursor-pointer"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UploadImage;
