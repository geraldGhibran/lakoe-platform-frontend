import CardProduct from '../CardProduct';

function ListProduct() {
  return (
    <>
      {/* <HStack
            display={'flex'}
            gap={2}
            width={'100%'}
            justifyContent={'space-between'}
        >
            <InputGroup
                startElement={
                    <Icon icon={'ant-design:search-outlined'} color="black" />
                }
            >
                <Input
                    placeholder="Cari Produk"
                    borderColor={'#E6E6E6'}
                    width={'318px'}
                />
            </InputGroup>
            <SelectRoot
                // collection={categoryCollectionDummy}
                w={'240px'}
                size="sm"
            >
                <SelectTrigger>
                    <SelectValueText placeholder="pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                    {categoryCollectionDummy.items.map((item) => (
                        <SelectItem key={item.value} item={item}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>

            <SelectRoot collection={sortCollectionDummy} size="sm" w={'240px'}>
                <SelectTrigger>
                    <SelectValueText placeholder="urutkan" />
                </SelectTrigger>
                <SelectContent>
                    {sortCollectionDummy.items.map((item) => (
                        <SelectItem
                            key={item.value}
                            item={item}
                            onClick={() => console.log(item.value)}
                        >
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
        </HStack> */}

      <CardProduct />
    </>
  );
}

export default ListProduct;
