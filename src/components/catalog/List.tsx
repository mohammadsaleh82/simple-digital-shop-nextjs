import { DATA } from '@/mudules/products/mock/products';
import { Card, CardContent } from '../ui';
import Image from 'next/image';
const CatalogList = () => {
  const images = DATA[0].images;

  return (
    <div className="flex flex-wrap justify-center mb-4">
      {images?.map((_image, index) => {
        return (
          <div className="p-1" key={index}>
            <Card className="flex justify-center items-center p-6 h-100 w-100 ">
              <CardContent>
                <Image
                  src={_image.image}
                  alt="gallery"
                  width={400}
                  height={400}
                  className="hover:scale-105 transform transition-transform duration-300"
                />
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default CatalogList;
