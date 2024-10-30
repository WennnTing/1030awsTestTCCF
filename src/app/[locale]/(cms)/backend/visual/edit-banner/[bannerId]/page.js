import { _getBannerById } from "@/actions/_banner";
import EditBannerForm from "./_component/edit-banner-form";
export default async function EditBannerPage({ params: { bannerId } }) {
  const banner = await _getBannerById(bannerId);

  return (
    <div>
      <EditBannerForm banner={banner.data} />
    </div>
  );
}
