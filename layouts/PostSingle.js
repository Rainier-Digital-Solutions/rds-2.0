import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import Base from "./Baseof";

const PostSingle = ({ frontmatter, content, mdxContent }) => {
  let { description, meta_description, title, image, featured_image_link } = frontmatter;
  description = meta_description ?? description ?? content.slice(0, 120);

  return (
    <Base title={title} description={description}>
      <section className="section">
        <div className="container">
          <div className="row">
            <article className="mx-auto text-center col-12 md:col-8">
              {image && featured_image_link ? (
                <Link
                  href={featured_image_link}
                  target="_blank"
                >
                  <Image
                    src={image}
                    height="500"
                    width="1000"
                    alt={title}
                    priority={true}
                    className="rounded-lg"
                  />
                </Link>
              )
                : image &&
                (
                  <Image
                    src={image}
                    height="500"
                    width="1000"
                    alt={title}
                    priority={true}
                    className="rounded-lg"
                  />
                )}
              {markdownify(title, "h1", "h2 mb-6 mt-6 text-left")}

              <div className="mb-16 text-left content">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </div>
            </article>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default PostSingle;
