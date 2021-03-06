import { NextSeo } from "next-seo";
import echarts from 'echarts'
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import Layout from "components/layout";
import { LatestCounty } from "components/latest-county";
import { getCandidatesByCounty } from "lib/api";
import { Candidate } from "lib/contentTypes";
import { CountiesMap } from "components/counties-map"
import roCoordinates from 'components/counties-map/ro-coordinates.json'
import counties from 'lib/counties.json'
import { getCountyCodeBySlug, getCountyNameByCountyCode } from 'lib/utils'
import { useEffect, useState } from "react";

echarts.registerMap('RO', roCoordinates);

export default function IndexPage({
  preview,
  candidatesByCounty,
}: {
  preview: boolean;
  candidatesByCounty: Candidate[];
}) {
  const [selectedCountyCode, setSelectedCountyCode] = useState<string | null>(null)
  const router = useRouter();
  if (router.isFallback && !candidatesByCounty) {
    return <ErrorPage statusCode={404} />;
  }

  useEffect(() => {
    const { slug: countySlug } = router.query
    const countyCode = getCountyCodeBySlug(countySlug as string)
    setSelectedCountyCode(countyCode)
  }, [router.query])

  const filterCanditatesByCounty = (mapEvent: unknown) => {
    const { data: { slug } } = mapEvent as { name: string, data: { slug: string } }
    router.push(`/harta/[slug]`, `/harta/${slug}`)
  }

  const getMapData = () => {
    const { slug: countySlug } = router.query
    const mapdata = []
    counties.forEach(county => {
      const mapItem = {
        name: county.value,
        slug: county.slug
      }

      if (county.slug === countySlug) {
        mapItem['itemStyle'] = {
          areaColor: 'rgba(220, 38, 38)'
        }
        mapItem['label'] = { color: '#fff' }
      }
      mapdata.push(mapItem)
    })

    return mapdata
  }

  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <>Loading…</>
      ) : (
          <>
            <NextSeo
              title={`Harta - Nu tot ei!`}
              description={`Harta pe judete`}
              canonical={`https://nutotei.ro/harta`}
              openGraph={{
                url: `https://nutotei.ro/harta`,
                title: `Harta - Nu tot ei!`,
                description: `Harta pe judete`,
              }}
            />
            <div className="relative pt-6">
              <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
                <div className="text-center">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="inline">Politruci </span>
                    <span className="text-red-600 inline">pe județe</span>
                  </h1>
                  <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Selectează județul dorit și verifcă lista
            </p>

                </div>
              </main>
            </div>
            <CountiesMap onClick={filterCanditatesByCounty} data={getMapData()} />
            <LatestCounty candidates={candidatesByCounty} countyName={getCountyNameByCountyCode(selectedCountyCode)} />
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({
  params,
  preview = false,
}: {
  params: { slug: string };
  preview: boolean;
}) {
  const { slug } = params
  const candidatesByCounty = await getCandidatesByCounty(getCountyCodeBySlug(slug));

  return {
    props: {
      preview,
      candidatesByCounty,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: counties?.map(({ slug }) => `/harta/${slug}`),
    fallback: true,
  };
}

