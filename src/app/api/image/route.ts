import { prisma } from '@/lib/prisma';
import { existsSync } from 'fs';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL((await req).url);
  const productId = searchParams.get('productId');
  if (productId) {
    const images = await prisma.image.findMany({
      where: { productId },
    });
    console.log(images);

    return NextResponse.json(images);
  }
  return NextResponse.json(
    { message: 'Missing get ProductId' },
    {
      status: 400,
    },
  );
};

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get('image') as File;
  const productId = formData.get('productId') as string;
  if (!file || !productId) {
    return NextResponse.json(
      { message: 'Missing get ProductId' },
      {
        status: 400,
      },
    );
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadeDir = path.join(process.cwd(), 'public/assets', productId);
  await mkdir(uploadeDir, { recursive: true });

  const filePath = path.join(uploadeDir, file.name);
  await writeFile(filePath, buffer);

  const fileUrl = `/assets/${productId}/${file.name}`;

  const image = await prisma.image.create({
    data: {
      image: fileUrl,
      productId: productId,
    },
  });

  return NextResponse.json({
    message: 'Image Uploaded Successfuly',
    data: image,
  });
};

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL((await req).url);
  const imageId = searchParams.get('id');
  if (imageId) {
    const image = await prisma.image.findUnique({ where: { id: imageId } });
    if (image) {
      const filePath = path.join(process.cwd(), 'public', image.image);
      const exis = await existsSync(filePath);
      if (exis) {
        await unlink(filePath);
      }

      await prisma.image.delete({ where: { id: image.id } });
      return NextResponse.json({
        message: 'Delete image is Successfuly',
      });
    }
  }

  return NextResponse.json(
    {
      message: 'missing delete image',
    },
    {
      status: 400,
    },
  );
};
