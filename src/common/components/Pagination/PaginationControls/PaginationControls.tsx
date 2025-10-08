import s from "./PaginationControls.module.css";
import {getPaginationPages} from "@/common/utils";

type Props = {
  currentPage: number
  setCurrentPage: (page: number) => void
  pagesCount: number
}

const PaginationControls = ({currentPage, setCurrentPage, pagesCount}: Props) => {
  const pages = getPaginationPages(currentPage, pagesCount)

  return (
    <div className={s.pagination}>
      {pages.map((page, idx) =>
        page === '...' ? (
          <span className={s.ellipsis} key={`ellipsis-${idx}`}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={
              page === currentPage ? `${s.pageButton} ${s.pageButtonActive}` : s.pageButton
            }
            onClick={() => page !== currentPage && setCurrentPage(Number(page))}
            disabled={page === currentPage}
            type="button"
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default PaginationControls;