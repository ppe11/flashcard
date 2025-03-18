'use client'

import PetGrid from '@/components/PetGrid';
import PetsLayout from '@/components/PetsLayout';
import React from 'react'

const PetsDogs = () => {
    return (
        <PetsLayout>
            <PetGrid type="dogs" />;
        </PetsLayout>
    );
};

export default PetsDogs
