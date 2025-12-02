import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TemplateImageGalleryProps {
  preview_images?: string[];
  image?: string;
  title: string;
}

export default function TemplateImageGallery({
  preview_images,
  image,
  title,
}: TemplateImageGalleryProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {preview_images && preview_images.length > 0 ? (
          preview_images.map((img, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden py-0">
                <CardContent className="p-0">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={img}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority={index === 0}
                    />
                  </AspectRatio>
                </CardContent>
              </Card>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem>
            <Card className="overflow-hidden py-0">
              <CardContent className="p-0">
                <AspectRatio ratio={16 / 9}>
                  {image ? (
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority
                    />
                  ) : (
                    <div className="from-primary/20 to-chart-4/30 h-full w-full bg-linear-to-br" />
                  )}
                </AspectRatio>
              </CardContent>
            </Card>
          </CarouselItem>
        )}
      </CarouselContent>
      {preview_images && preview_images.length > 1 && (
        <>
          <CarouselPrevious className="left-2 lg:left-4" />
          <CarouselNext className="right-2 lg:right-4" />
        </>
      )}
    </Carousel>
  );
}
