import "./BreadCrumbs.scss";

type BreadCrumbsProps = {
  mainPage: string;
  currentPage: string;
};

export default function BreadCrumbs({
  mainPage,
  currentPage,
}: BreadCrumbsProps) {
  return (
    <div className='breadcrumbs'>
      <span className='breadcrumbs__main'>{mainPage}</span>
      <span className='breadcrumbs__separator'>{">"}</span>
      <span className='breadcrumbs__current'>{currentPage}</span>
    </div>
  );
}
