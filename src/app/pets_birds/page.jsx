import PetGrid from '@/components/PetGrid'
import PetsLayout from '@/components/PetsLayout'
import React from 'react'

const PetsBirds = () => {
  return (
    <PetsLayout>
        <PetGrid type="birds" />;
    </PetsLayout>
  )
}

export default PetsBirds
