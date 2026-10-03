import { NextResponse } from 'next/server';
import { fetchSpaceWeatherData } from '@/lib/nasa/donki';

export async function GET() {
  try {
    const data = await fetchSpaceWeatherData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API space-weather error:', error);
    return NextResponse.json(
      { error: 'NASA data temporarily unavailable' },
      { status: 500 }
    );
  }
}
