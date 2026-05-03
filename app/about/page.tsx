import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";
import { BreadcrumbSchema } from "@/components/seo/schema";

export const metadata: Metadata = {
  title: "About — Your Friendly Developer",
  description:
    "The real story behind FlipMyCase — built by an experienced web developer and CADC-II counselor with over a decade of self-taught development.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About — Your Friendly Developer",
    description:
      "The real story behind FlipMyCase — built by an experienced web developer and CADC-II counselor with over a decade of self-taught development.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Your Friendly Developer",
  jobTitle: "Web Developer, CADC-II Counselor",
  worksFor: {
    "@type": "Organization",
    name: "Your Friendly Developer LLC",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Prunedale",
    addressRegion: "California",
  },
  url: `${SITE_URL}/about`,
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <main className="mx-auto max-w-3xl px-4 py-8" style={{ lineHeight: 1.7 }}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          About Your Friendly Developer
        </h1>

        <div className="mt-6 text-sm text-neutral-300 space-y-4">
          <p>This is why I built this.</p>

          <p>
            I'm not going to pretend this started with a vision board or a business plan. It started
            in a storage shed in Salinas in 2013, when I was thirty-seven years old with nothing to
            my name and nowhere to be.
          </p>

          <p>
            I'd been homeless for two years. Living out of my truck, sleeping in a shed behind my
            son's grandmother's house. The last two years of my drinking and using looked like that.
            On September 27th, 2013, I got sober. Got a bed in a treatment facility. That's where my
            life actually started.
          </p>

          <p>
            What nobody tells you about early recovery is how broke it is. Not just financially
            broke, though that too. Broke in every way. No credit. No savings. No plan. No idea what
            retirement even meant for someone like me. I was going to work until I died. That was the
            whole plan.
          </p>

          <p>Then I got my first laptop.</p>

          <p>
            I'd been working at the treatment center where I got sober. Went from client to overnight
            staff when my old counselor, who had become the director, offered me the job. He saw
            something in me I couldn't see yet. I walked through that door feeling like a complete
            fraud. I walked through it anyway.
          </p>

          <p>
            On my days off I started trying to figure out how to make money online. I tried probably
            a hundred different things over the next thirteen years. None of them worked. Not because
            the ideas were bad, because I'm an addict, and addicts chase shiny objects. I'd start
            something, get excited about something else, abandon the first thing, chase the new
            thing. Repeat. For over a decade.
          </p>

          <p>
            What finally changed it wasn't willpower. It was everything I'd learned in recovery, and
            in the mental health field working with clients, and fixing my own credit from scratch
            without anyone's help, and figuring out the tax system after years of not filing, and
            slowly, painfully, teaching myself SEO, then content strategy, then AI and LLM
            optimization, then UI design that actual humans enjoy using.
          </p>

          <p>
            Thirteen years of self-education. Every skill on these sites I learned the hard way
            because I had to.
          </p>

          <p>
            I built these tools because people like me needed them and couldn't afford them. People
            who are starting over. People who are broke and scared and trying to figure out a system
            that was never explained to them. People who need real information without the paywall,
            without the condescension, without the assumption that they already know what they're
            doing.
          </p>

          <p>
            I still work a full-time job. I'm pursuing my Bachelor of Social Work with plans for my
            MSW. I take photos. And when I get home or get done with school work, I come here. This
            is the other thing that turns me on and settles me down at the same time. There's
            something about building something useful that hits different when you spent years
            building nothing.
          </p>

          <p>
            Your Friendly Developer is my LLC. I am the developer. This is my work.
          </p>

          <p>
            If you're looking for the guy behind these sites, it's me. A CADC-II counselor, a
            self-taught web builder, a recovering addict with over twelve years of sobriety, a guy
            who fixed his own credit and figured out his own taxes and is still figuring out
            everything else one day at a time.
          </p>

          <p>I'm not a corporation. I'm not a content farm. I'm one person who lived a lot of the things these tools are about.</p>

          <p>That's why I built them.</p>
        </div>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">About FlipMyCase</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-4">
            <p>
              I'm self-taught. Everything I know about SEO, web development, content writing, and
              building tools people actually want to use I learned myself over thirteen years of
              trial and error. A lot of error.
            </p>
            <p>
              FlipMyCase started as a tool I built because I kept needing it and kept having to look
              up the rules. Sentence case versus title case. camelCase versus snake_case. What's
              right for a button label versus a blog headline. Now it's here for everyone who's ever
              stared at a text field wondering what the correct convention is.
            </p>
            <p>Simple tool. Real person behind it.</p>
          </div>
        </section>

        <p className="mt-10 text-sm text-neutral-400 border-t border-neutral-700 pt-6">
          Your Friendly Developer LLC / Prunedale, California
        </p>

        <p className="mt-6 text-xs text-neutral-500">
          Questions or feedback?{" "}
          <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
            Get in touch
          </Link>
          .
        </p>
      </main>
    </>
  );
}
