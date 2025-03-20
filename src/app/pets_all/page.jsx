'use client'

import React, { useEffect, useState, Suspense } from 'react'
import PetGrid from '@/components/PetGrid'
import FilterButtons from '@/components/FilterButtons'
import { useSearchParams } from 'next/navigation'

// Client component that uses useSearchParams
const AllPetsPageClient = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true)
        const url = type && type !== 'all' 
          ? `/pets?type=${type}` 
          : '/pets'
        
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Failed to fetch pets${type ? ' of type ' + type : ''}`)
        }
        const data = await response.json()
        setPets(data)
      } catch (error) {
        console.error('Error fetching pets:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPets()
  }, [type])

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-center mb-8">
          {type === 'cat' ? 'Cats' : 
          type === 'dog' ? 'Dogs' : 
          type === 'bird' ? 'Birds' : 
          'All Pets'} Available for Adoption
        </h1>
        <div className="min-h-[300px] flex items-center justify-center">Loading pets...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-center mb-8">
          {type === 'cat' ? 'Cats' : 
          type === 'dog' ? 'Dogs' : 
          type === 'bird' ? 'Birds' : 
          'All Pets'} Available for Adoption
        </h1>
        <div className="min-h-[300px] flex items-center justify-center text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">
        {type === 'cat' ? 'Cats' : 
         type === 'dog' ? 'Dogs' : 
         type === 'bird' ? 'Birds' : 
         'All Pets'} Available for Adoption
      </h1>
      <PetGrid pets={pets} />
    </div>
  )
}

// Page component with Suspense
const AllPetsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 pt-30">
      <FilterButtons />
      <Suspense fallback={
        <div>
          <h1 className="text-3xl font-bold text-center mb-8">Pets Available for Adoption</h1>
          <div className="min-h-[300px] flex items-center justify-center">Loading pets...</div>
        </div>
      }>
        <AllPetsPageClient />
      </Suspense>
    </div>
  )
}

export default AllPetsPage
