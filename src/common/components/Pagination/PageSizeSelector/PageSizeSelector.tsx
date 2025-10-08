type Props = {
  pageSize: number
  changePageSize: (pageSize: number) => void

}

const PageSizeSelector = ({changePageSize, pageSize}: Props) => {
  return (
    <label>
      Show
      <select value={pageSize} onChange={(e) => changePageSize(Number(e.target.value))}>
        {[2, 4, 8, 16, 20, 32].map((size) => (<option key={size} value={size}>{size}</option>))}
      </select>
    </label>
  );
};

export default PageSizeSelector;