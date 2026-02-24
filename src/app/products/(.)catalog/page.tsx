import CatalogList from '@/components/catalog/List';
import CatalogSelector from '@/components/catalog/Selector';

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center my-4 mx-auto">
      <CatalogList />
      <CatalogSelector />
    </div>
  );
};

export default page;
