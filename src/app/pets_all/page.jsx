'use client'

import PetGrid from '@/components/PetGrid';
import PetsLayout from '@/components/PetsLayout';
import React from 'react'


const PetsAll = () => {
    return (
        <PetsLayout>
            <PetGrid type="all" />
        </PetsLayout>
    );
};

export default PetsAll
