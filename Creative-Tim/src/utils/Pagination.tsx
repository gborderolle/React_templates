// Clase 119: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/26013618#overview
import { useEffect, useState } from "react";

export default function Pagination(props: paginationProps) {
  const [linkList, setLinkList] = useState<modelLink[]>([]);

  useEffect(() => {
    const previousPageEnabled = props.actualPage !== 1;
    const previousPage = props.actualPage - 1;
    const links: modelLink[] = [];

    links.push({
      text: "Anterior",
      enabled: previousPageEnabled,
      page: previousPage,
      active: false,
    });

    for (let i = 1; i <= props.totalPages; i++) {
      if (
        i >= props.actualPage - props.ratio &&
        i <= props.actualPage + props.ratio
      ) {
        links.push({
          text: `${i}`,
          active: props.actualPage === i,
          enabled: true,
          page: i,
        });
      }
    }

    const nextPageEnabled =
      props.actualPage !== props.totalPages && props.totalPages > 0;
    const nextPage = props.actualPage + 1;
    links.push({
      text: "Siguiente",
      page: nextPage,
      enabled: nextPageEnabled,
      active: false,
    });

    setLinkList(links);
  }, [props.actualPage, props.totalPages, props.ratio]);

  function getClass(link: modelLink) {
    if (link.active) {
      return "active pointer";
    }
    if (!link.enabled) {
      return "disabled";
    }
    return "pointer";
  }
  function selectPage(link: modelLink) {
    if (link.page === props.actualPage) {
      return;
    }
    if (!link.enabled) {
      return;
    }
    props.onChange(link.page);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {linkList.map((link) => (
          <li
            key={link.text}
            onClick={() => selectPage(link)}
            className={`page-item cursor m-2 ${getClass(link)}`}
          >
            <span className="page-link">{link.text}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface modelLink {
  page: number;
  enabled: boolean;
  text: string;
  active: boolean;
}

interface paginationProps {
  actualPage: number;
  totalPages: number;
  ratio: number;
  onChange(page: number): void;
}

Pagination.defaultProps = {
  ratio: 3,
};
