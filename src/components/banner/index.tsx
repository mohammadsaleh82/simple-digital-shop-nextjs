
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Card, CardContent 
} from "@/components/ui"

import IMG1 from './images/a.jpg'
import IMG2 from './images/b.jpg'
import IMG3 from './images/c.jpg'
import Image from "next/image"

export function Banner() {
  return (
    <Carousel className="w-full  ">
      <CarouselContent>
        {[IMG1,IMG2,IMG3].map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="relative  aspect-square h-100 flex items-center justify-center w-full p-6 ">
                  <Image src={item} alt={`Image ${index + 1}`} fill className=" object-cover" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
