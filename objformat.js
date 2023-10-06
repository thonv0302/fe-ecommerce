const data = {
  operationName: 'CreateProduct',
  variables: {
    product: {
      title: 'product 2',
      descriptionHtml: '',
      handle: '',
      seo: {
        title: '',
        description: '',
      },
      status: 'ACTIVE',
      options: ['Size', 'Color'],
      images: [],
      tags: [],
      templateSuffix: '',
      giftCardTemplateSuffix: '',
      vendor: '',
      productCategory: null,
      productType: '',
      publications: [
        {
          publicationId: 'gid://shopify/Publication/113480401095',
        },
        {
          publicationId: 'gid://shopify/Publication/113480466631',
        },
        {
          publicationId: 'gid://shopify/Publication/113480499399',
        },
        {
          publicationId: 'gid://shopify/Publication/113480368327',
        },
      ],
      giftCard: false,
      collectionsToJoin: [],
      workflow: 'product-details-create',
      metafields: [],
      variants: [
        {
          imageId: null,
          options: ['L', 'black'],
          requiresShipping: true,
          weight: 0,
          weightUnit: 'KILOGRAMS',
          sku: '',
          barcode: '',
          inventoryPolicy: 'DENY',
          inventoryQuantities: [
            {
              availableQuantity: 10,
              locationId: 'gid://shopify/Location/68812308679',
            },
          ],
          fulfillmentServiceId: 'gid://shopify/FulfillmentService/manual',
          inventoryItem: {
            cost: null,
            tracked: true,
            harmonizedSystemCode: null,
            countryCodeOfOrigin: null,
            provinceCodeOfOrigin: null,
            measurement: {
              dimensions: {
                length: 0,
                width: 0,
                height: 0,
                unit: 'CENTIMETERS',
              },
              shippingPackageId: null,
            },
          },
          price: '1000.00',
          compareAtPrice: null,
          taxable: true,
          taxCode: '',
        },
      ],
    },
    media: [
      {
        mediaContentType: 'IMAGE',
        originalSource:
          'https://shopify-staged-uploads.storage.googleapis.com/tmp/63417123015/products/274060c2-dc24-4b68-8f61-7117909f016c/khanh.jpg',
      },
      {
        mediaContentType: 'IMAGE',
        originalSource:
          'https://shopify-staged-uploads.storage.googleapis.com/tmp/63417123015/products/543fe214-05d5-4829-861c-35caff1ca078/tho.jpg',
      },
    ],
    productPreferences: {
      showSkuAndBarcode: false,
      showInternationalShipping: true,
    },
  },
  query:
    'mutation CreateProduct($product: ProductInput!, $media: [CreateMediaInput!], $productPreferences: ProductPreferencesInput) {\n  productCreate(\n    input: $product\n    media: $media\n    productPreferences: $productPreferences\n  ) {\n    product {\n      id\n      title\n      handle\n      descriptionHtml\n      resourceAlerts {\n        content\n        dismissed\n        dismissibleHandle\n        severity\n        title\n        actions {\n          primary\n          title\n          url\n          __typename\n        }\n        __typename\n      }\n      ...SEOCardProduct\n      ...ProductCategory\n      ...ProductType\n      __typename\n    }\n    userErrors {\n      field\n      message\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment SEOCardProduct on Product {\n  seo {\n    title\n    description\n    __typename\n  }\n  __typename\n}\n\nfragment ProductCategory on Product {\n  productCategory {\n    productTaxonomyNodeId\n    parentProductTaxonomyNodeId\n    name\n    fullName\n    isLeaf\n    isRoot\n    level\n    __typename\n  }\n  inferredProductMetadata {\n    productCategory {\n      productTaxonomyNodeId\n      parentProductTaxonomyNodeId\n      name\n      fullName\n      isLeaf\n      isRoot\n      level\n      __typename\n    }\n    source\n    __typename\n  }\n  __typename\n}\n\nfragment ProductType on Product {\n  productType\n  __typename\n}\n',
};

const data2 = {
  operationName: 'CreateProductCreateProductVariants',
  variables: {
    productId: 'gid://shopify/Product/7767382589639',
    variantsToBulkCreate: [
      {
        imageId: null,
        options: ['L', 'white'],
        requiresShipping: true,
        weight: 0,
        weightUnit: 'KILOGRAMS',
        sku: '',
        barcode: '',
        inventoryPolicy: 'DENY',
        inventoryQuantities: [
          {
            availableQuantity: 20,
            locationId: 'gid://shopify/Location/68812308679',
          },
        ],
        fulfillmentServiceId: 'gid://shopify/FulfillmentService/manual',
        inventoryItem: {
          cost: null,
          tracked: true,
          harmonizedSystemCode: null,
          countryCodeOfOrigin: null,
          provinceCodeOfOrigin: null,
          measurement: {
            dimensions: {
              length: 0,
              width: 0,
              height: 0,
              unit: 'CENTIMETERS',
            },
            shippingPackageId: null,
          },
        },
        price: '2000.00',
        compareAtPrice: null,
        taxable: true,
        taxCode: '',
      },
      {
        imageId: null,
        options: ['M', 'black'],
        requiresShipping: true,
        weight: 0,
        weightUnit: 'KILOGRAMS',
        sku: '',
        barcode: '',
        inventoryPolicy: 'DENY',
        inventoryQuantities: [
          {
            availableQuantity: 30,
            locationId: 'gid://shopify/Location/68812308679',
          },
        ],
        fulfillmentServiceId: 'gid://shopify/FulfillmentService/manual',
        inventoryItem: {
          cost: null,
          tracked: true,
          harmonizedSystemCode: null,
          countryCodeOfOrigin: null,
          provinceCodeOfOrigin: null,
          measurement: {
            dimensions: {
              length: 0,
              width: 0,
              height: 0,
              unit: 'CENTIMETERS',
            },
            shippingPackageId: null,
          },
        },
        price: '3000.00',
        compareAtPrice: null,
        taxable: true,
        taxCode: '',
      },
      {
        imageId: null,
        options: ['M', 'white'],
        requiresShipping: true,
        weight: 0,
        weightUnit: 'KILOGRAMS',
        sku: '',
        barcode: '',
        inventoryPolicy: 'DENY',
        inventoryQuantities: [
          {
            availableQuantity: 40,
            locationId: 'gid://shopify/Location/68812308679',
          },
        ],
        fulfillmentServiceId: 'gid://shopify/FulfillmentService/manual',
        inventoryItem: {
          cost: null,
          tracked: true,
          harmonizedSystemCode: null,
          countryCodeOfOrigin: null,
          provinceCodeOfOrigin: null,
          measurement: {
            dimensions: {
              length: 0,
              width: 0,
              height: 0,
              unit: 'CENTIMETERS',
            },
            shippingPackageId: null,
          },
        },
        price: '4000.00',
        compareAtPrice: null,
        taxable: true,
        taxCode: '',
      },
      {
        imageId: null,
        options: ['S', 'black'],
        requiresShipping: true,
        weight: 0,
        weightUnit: 'KILOGRAMS',
        sku: '',
        barcode: '',
        inventoryPolicy: 'DENY',
        inventoryQuantities: [
          {
            availableQuantity: 50,
            locationId: 'gid://shopify/Location/68812308679',
          },
        ],
        fulfillmentServiceId: 'gid://shopify/FulfillmentService/manual',
        inventoryItem: {
          cost: null,
          tracked: true,
          harmonizedSystemCode: null,
          countryCodeOfOrigin: null,
          provinceCodeOfOrigin: null,
          measurement: {
            dimensions: {
              length: 0,
              width: 0,
              height: 0,
              unit: 'CENTIMETERS',
            },
            shippingPackageId: null,
          },
        },
        price: '5000.00',
        compareAtPrice: null,
        taxable: true,
        taxCode: '',
      },
      {
        imageId: null,
        options: ['S', 'white'],
        requiresShipping: true,
        weight: 0,
        weightUnit: 'KILOGRAMS',
        sku: '',
        barcode: '',
        inventoryPolicy: 'DENY',
        inventoryQuantities: [
          {
            availableQuantity: 60,
            locationId: 'gid://shopify/Location/68812308679',
          },
        ],
        fulfillmentServiceId: 'gid://shopify/FulfillmentService/manual',
        inventoryItem: {
          cost: null,
          tracked: true,
          harmonizedSystemCode: null,
          countryCodeOfOrigin: null,
          provinceCodeOfOrigin: null,
          measurement: {
            dimensions: {
              length: 0,
              width: 0,
              height: 0,
              unit: 'CENTIMETERS',
            },
            shippingPackageId: null,
          },
        },
        price: '6000.00',
        compareAtPrice: null,
        taxable: true,
        taxCode: '',
      },
    ],
  },
  query:
    'mutation CreateProductCreateProductVariants($productId: ID!, $variantsToBulkCreate: [ProductVariantsBulkInput!]!) {\n  productVariantsBulkCreate(\n    productId: $productId\n    variants: $variantsToBulkCreate\n  ) {\n    userErrors {\n      field\n      message\n      __typename\n    }\n    __typename\n  }\n}\n',
};
