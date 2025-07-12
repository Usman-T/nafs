import parse, {
  HTMLReactParserOptions,
  domToReact,
  Element,
  Text,
} from "html-react-parser";

export function renderTafsir(html: string) {
  const options: HTMLReactParserOptions = {
    replace: (node) => {
      if (node instanceof Element) {
        // Paragraphs
        if (node.name === "p") {
          const text = node.children
            .map((child) => (child.type === "text" ? (child as Text).data : ""))
            .join("")
            .trim();

          const isShort = text.length < 30;

          return (
            <p
              className={`${
                isShort
                  ? "text-[#fe8019] font-bold text-lg mt-6 mb-2"
                  : "text-[#a89984] leading-relaxed mb-4"
              } `}
            >
              {domToReact(node.children, options)}
            </p>
          );
        }

        // Strong tags → bold
        if (node.name === "strong") {
          return (
            <strong className="font-semibold text-[#ebdbb2]">
              {domToReact(node.children, options)}
            </strong>
          );
        }

        // Emphasis → italic
        if (node.name === "em") {
          return (
            <em className="italic text-[#ebdbb2]">
              {domToReact(node.children, options)}
            </em>
          );
        }

        // List support
        if (node.name === "ul") {
          return (
            <ul className="list-disc pl-6 text-[#a89984] mb-4">
              {domToReact(node.children, options)}
            </ul>
          );
        }

        if (node.name === "li") {
          return <li className="mb-1">{domToReact(node.children, options)}</li>;
        }
      }

      return;
    },
  };

  return parse(html, options);
}
