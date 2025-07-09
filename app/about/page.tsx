import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About | CleverSpace Solutions - Joesp H.',
  description: 'Discover the story behind CleverSpace Solutions. Learn how we help transform homes and lives through smart organization, beautiful design, and practical lifestyle tips.',
  keywords: ['about us', 'home organization', 'interior design', 'lifestyle blogger', 'home inspiration', 'clever space solutions'],
  robots: 'index, follow',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gray-100 flex items-center justify-center">
            <Image
              src="/images/navbar/logo2.webp"
              alt="Joesp H. - CleverSpace Solutions"
              width={99}
              height={99}
              className="object-cover rounded-full"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6">
            Hi, I'm Joesp H.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Welcome to my corner of the internet where minimalism meets functionality, 
            and every space tells a story of intentional living.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl pb-24">
        
        {/* Our Story */}
        <section className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-8">
            My Story
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              It all started in 2019 when I moved into my first tiny apartment in Brooklyn. 
              <strong> 450 square feet, one closet, and absolutely no storage.</strong> I was fresh out 
              of college, drowning in stuff I didn't know how to organize, and constantly tripping 
              over everything in my cramped space.
            </p>
            
            <p>
              <em>"There has to be a better way,"</em> I said one evening, stepping over a pile of 
              books for the third time that day. That's when my journey began – not just with organizing 
              my space, but discovering that <strong>how we live directly impacts how we feel.</strong>
            </p>
            
            <p>
              I spent months researching, experimenting, and yes – making plenty of mistakes! I tried 
              every Pinterest hack, bought storage solutions that didn't work, and even painted an accent 
              wall bright orange (spoiler alert: it was terrible). But with each trial and error, I 
              learned something valuable.
            </p>
            
            <p>
              The breakthrough came when I stopped trying to copy what worked for others and started 
              <strong> creating solutions that worked for me.</strong> I realized that smart living isn't 
              about having the perfect Instagram-worthy space – it's about creating a home that supports 
              your lifestyle, reduces stress, and brings you joy.
            </p>
            
            <p>
              Fast forward to today: I've transformed not just my own homes (yes, I've moved a few times!), 
              but I've helped thousands of people create spaces they love. What started as a necessity 
              became my passion, and my passion became CleverSpace Solutions.
            </p>
          </div>
        </section>

        {/* What I Believe */}
        <section className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-8">
            What I Believe
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Your Home Should Work for You</h3>
              <p className="text-gray-700 leading-relaxed">
                Not the other way around. Every space should make your life easier, not more complicated.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Simple Solutions Win</h3>
              <p className="text-gray-700 leading-relaxed">
                The best organizing systems are the ones you'll actually use. Complicated = failure.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Real Life, Real Solutions</h3>
              <p className="text-gray-700 leading-relaxed">
                I live in the real world with real budgets, real messes, and real time constraints.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Progress Over Perfection</h3>
              <p className="text-gray-700 leading-relaxed">
                A slightly messy but functional space beats a Pinterest-perfect room you can't live in.
              </p>
            </div>
          </div>
        </section>

        {/* About Me */}
        <section className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-8">
            About Me
          </h2>
          
          <div className="max-w-2xl">
            <p className="text-gray-700 leading-relaxed mb-6">
              Former marketing manager turned full-time home optimizer. I have an obsession with 
              finding the perfect place for everything and turning chaotic spaces into serene sanctuaries. 
              I'm the one behind most of the organization hacks you'll find here and I love a good before-and-after reveal.
            </p>
            <p className="text-gray-600 italic">
              "I believe every item should have a home, and every home should spark joy."
            </p>
          </div>
        </section>

        {/* My Mission */}
        <section className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-8">
            My Mission
          </h2>
          
          <div className="max-w-2xl">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              To help busy people create homes that support their best lives – through practical organization, 
              smart design choices, and sustainable lifestyle changes that actually stick.
            </p>
            <p className="text-lg text-gray-600">
              I believe that when your space works better, everything else gets a little easier. 
              <strong> That's the CleverSpace difference.</strong>
            </p>
          </div>
        </section>

        {/* Fun Facts */}
        <section className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-8">
            Random Fun Facts About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-2 border-gray-200 pl-6">
              <h4 className="font-medium text-gray-900 mb-2">300+ Books</h4>
              <p className="text-gray-600 text-sm">
                I've read every organizing and design book I could get my hands on. My favorites? 
                "The Life-Changing Magic of Tidying Up" and "Atomic Habits."
              </p>
            </div>
            
            <div className="border-l-2 border-gray-200 pl-6">
              <h4 className="font-medium text-gray-900 mb-2">7 Homes</h4>
              <p className="text-gray-600 text-sm">
                I've lived in 7 different homes in 5 years – from 450 sq ft to 2,000 sq ft. 
                Each taught me something new about space optimization.
              </p>
            </div>
            
            <div className="border-l-2 border-gray-200 pl-6">
              <h4 className="font-medium text-gray-900 mb-2">Coffee Addict</h4>
              <p className="text-gray-600 text-sm">
                My coffee station is the most organized part of my kitchen. Priorities, right? 
                I literally have a color-coded system for my coffee pods.
              </p>
            </div>
            
            <div className="border-l-2 border-gray-200 pl-6">
              <h4 className="font-medium text-gray-900 mb-2">Cat Parent</h4>
              <p className="text-gray-600 text-sm">
                My cat Luna is the real test of my organizing systems. If it's cat-proof, 
                it's probably human-proof too!
              </p>
            </div>
            
            <div className="border-l-2 border-gray-200 pl-6">
              <h4 className="font-medium text-gray-900 mb-2">Weekend Warrior</h4>
              <p className="text-gray-600 text-sm">
                Most of my best ideas come during weekend organizing marathons. 
                I'm that weird person who finds decluttering relaxing.
              </p>
            </div>
            
            <div className="border-l-2 border-gray-200 pl-6">
              <h4 className="font-medium text-gray-900 mb-2">Lightbulb Moments</h4>
              <p className="text-gray-600 text-sm">
                My best organizing hacks happen at 2 AM when I'm lying in bed. 
                I keep a notebook on my nightstand!
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-light text-gray-900 mb-6">Ready to Transform Your Space?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join my community of space-optimizers and get weekly tips, inspiration, and real-life solutions 
            delivered straight to your inbox.
          </p>
          
          <div className="flex flex-col gap-4 justify-center items-center">
            <Link
              href="/blog"
              className="bg-gray-900 text-white px-8 py-3 rounded font-medium hover:bg-gray-800 transition-colors no-underline"
            >
              Explore My Blog
            </Link>
            <p className="text-gray-600 mt-2">
              cleverspacesolutions@gmail.com
            </p>
          </div>
        </section>
      </div>
    </div>
  );
} 