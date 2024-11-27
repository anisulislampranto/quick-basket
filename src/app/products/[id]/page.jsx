import ProductDetailsClient from "@/components/ProductDetails/ProductDetailsClient";

// Function to fetch data for each page (runs at build time)
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`);
  const data = await res.json();

  return data.products.map((product) => ({
    id: product._id,
  }));
}

// Fetch the Product data during build or request
export async function getProductDetails(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch Product details');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const productDetails = await getProductDetails(params.id);

  return {
    title: productDetails ? productDetails.name : 'Product Details',
    description: `Details about ${productDetails?.name}`,
  };
}

export default async function Page({ params }) {
  const productDetails = await getProductDetails(params.id);

  if (!productDetails) {
    return <div className="h-screen text-center flex items-center justify-center">No details found for this Product..</div>;
  }

  return <ProductDetailsClient productDetails={productDetails?.product} />;
}
