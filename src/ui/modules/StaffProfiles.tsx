import React from 'react'
import { ResponsiveImg } from '@/ui/Img'
import moduleProps from '@/lib/moduleProps'
import Content from '@/ui/modules/RichtextModule/Content'
import Container from '@/ui/Container'

interface ProfileType {
  _key: string
  name: string
  role: string
  image: Sanity.Img
  content?: any[]
}

interface StaffProfilesProps {
  profiles?: ProfileType[]
}

const StaffProfiles = ({ profiles = [], ...props }: StaffProfilesProps) => {
  if (!profiles || profiles.length === 0) return null

  return (
    <section className="fp-section bg-white" {...moduleProps(props)}>
      <Container>
        <div className="flex flex-col gap-40 md:gap-80">
          {profiles.map((profile) => (
            <div key={profile._key} className="flex flex-col-reverse gap-40 md:grid md:grid-cols-4 xl:gap-40">
              {profile.content && (
                <div className="md:col-span-3">
                  <Content value={profile.content} />
                </div>
              )}

              <div className="md:relative md:col-span-1">
                <div className="flex flex-col gap-20 md:sticky md:top-40">
                  {profile.image && (
                    <ResponsiveImg img={profile.image} width={300} height={300} className="aspect-square w-full object-cover" />

                  )}
                  <div className="flex flex-col gap-6 md:gap-12">
                    {profile.name && <p className="fp-text-name">{profile.name}</p>}
                    {profile.role && <p className="fp-text-role">{profile.role}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default StaffProfiles
