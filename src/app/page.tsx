import { ImageCarousel } from '@/components/ImageCarousel';

const landingImages = [
  '/landing/landing-01.webp',
  '/landing/landing-02.webp', 
  '/landing/landing-03.webp',
  '/landing/landing-04.webp',
];

export default function Home() {
  return (
        <section className="h-screen w-screen flex items-center justify-center container mx-auto p-8 text-center">
            <div className="grid md:grid-cols-2 h-screen w-screen items-center gap-8">
                <div className="flex flex-col space-y-10 text-left">
                    <h1 className="text-2xl md:text-4xl font-bold leading-loose">Hi,<br/>I&apos;m Miguel Ferreira</h1>
                    <p>I&apos;m a software developer with a passion for the entrepreneurship world!</p>
                </div>

                <div id="images" className="h-64 md:h-[500px] w-full">
                  <ImageCarousel 
                    images={landingImages} 
                    autoplayDelay={5000}
                    className="w-full h-full"
                  />
                </div>
            </div>
        </section>
      );
}
