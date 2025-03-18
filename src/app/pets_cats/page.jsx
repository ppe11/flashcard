'use client'

import PetGrid from '@/components/PetGrid';
import PetsLayout from '@/components/PetsLayout';
import React from 'react'

const PetsCats = () => {
    return (
    
    <PetsLayout>
        <PetGrid type="cats" />;
    </PetsLayout>
    )
};

export default PetsCats
