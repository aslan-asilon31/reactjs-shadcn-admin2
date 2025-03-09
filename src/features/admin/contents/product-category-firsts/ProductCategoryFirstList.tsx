import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { ThemeSwitch } from '@/components/theme-switch';
import useProductCategoryFirstStore from '@/stores/productCategoryFirstStore';
import { FilterMatchMode, PrimeReactProvider } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { useEffect, useState } from 'react';

const ProductCategoryFirstList = () => {
  const { productcategoryfirsts, fetchProductCategoryFirsts } = useProductCategoryFirstStore();
  const [categoryValues, setCategoryValues] = useState([]);

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'product.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
});
const [loading, setLoading] = useState<boolean>(true);
const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  useEffect(() => {
    // Memanggil fungsi untuk fetch data
    fetchProductCategoryFirsts();
  }, [fetchProductCategoryFirsts]);

  useEffect(() => {
    // Memisahkan nilai setelah data di-fetch
    if (productcategoryfirsts && productcategoryfirsts.length > 0) {
      const values = productcategoryfirsts.map(category => ({
        name: category.name,
        slug: category.slug
      }));
      setCategoryValues(values);
    }
  }, [productcategoryfirsts]);


  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  



  
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
};

const renderHeader = () => {
    return (
        <div className="flex justify-content-end">
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </IconField>
        </div>
    );
};

const countryBodyTemplate = (rowData: Customer) => {
    return (
        <div className="flex align-items-center gap-2">
            <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
            <span>{rowData.country.name}</span>
        </div>
    );
};

const representativeBodyTemplate = (rowData: Customer) => {
    const representative = rowData.representative;

    return (
        <div className="flex align-items-center gap-2">
            <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" />
            <span>{representative.name}</span>
        </div>
    );
};

const representativesItemTemplate = (option: Representative) => {
    return (
        <div className="flex align-items-center gap-2">
            <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
            <span>{option.name}</span>
        </div>
    );
};

const statusBodyTemplate = (rowData: Customer) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
};

const statusItemTemplate = (option: string) => {
    return <Tag value={option} severity={getSeverity(option)} />;
};

const verifiedBodyTemplate = (rowData: Customer) => {
    return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified })}></i>;
};

const representativeRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
        <MultiSelect
            value={options.value}
            options={representatives}
            itemTemplate={representativesItemTemplate}
            onChange={(e: MultiSelectChangeEvent) => options.filterApplyCallback(e.value)}
            optionLabel="name"
            placeholder="Any"
            className="p-column-filter"
            maxSelectedLabels={1}
            style={{ minWidth: '14rem' }}
        />
    );
};

const statusRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
        <Dropdown value={options.value} options={statuses} onChange={(e: DropdownChangeEvent) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
    );
};

const verifiedRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return <TriStateCheckbox value={options.value} onChange={(e: TriStateCheckboxChangeEvent) => options.filterApplyCallback(e.value)} />;
};

const header = renderHeader();

  return (
    <div>
      <Header>
        <ProfileDropdown />
        <ThemeSwitch />
      </Header>
      <Main>

      <PrimeReactProvider>
          <div className="border-spacing-2 bg-purple-300 m-4 p-8">
            <p className="text-2xl font-bold text-purple-800">Product Category First List1</p>
          </div>
          <DataTable value={categoryValues}  paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
        globalFilterFields={['name', 'slug']} header={header} emptyMessage="No customers found.">
              
            <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
            <Column field="slug" header="Slugh" filter filterPlaceholder="Search by Slugh" style={{ minWidth: '12rem' }} />
        </DataTable>


          <Button label="Check" icon="pi pi-check" />


          




     
        </PrimeReactProvider>

        
      </Main>
    </div>
  );
};

export default ProductCategoryFirstList;
