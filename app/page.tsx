import { fetchSpaceWeatherData } from '@/lib/nasa/donki';
import { DashboardClient } from '@/components/dashboard/DashboardClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const initialData = await fetchSpaceWeatherData();

  return <DashboardClient initialData={initialData} />;
}
