'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import PetGrid from '../../components/PetGrid'
import FilterButtons from '../../components/FilterButtons'

const AllPetsPageClient = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  useEffect(() => {
    async function fetchPets() {
      setLoading(true)
      setError(null)
      
      try {
        // Build the URL with the type parameter if it exists
        const url = type ? `/pets?type=${encodeURIComponent(type)}` : '/pets'
        console.log(`Fetching pets from: ${url}`)
        
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Fetched data:', { 
          petCount: data.pets?.length || 0, 
          pagination: data.pagination,
          firstPet: data.pets && data.pets.length > 0 ? data.pets[0] : 'No pets found'
        })
        
        if (data.pets && Array.isArray(data.pets)) {
          setPets(data.pets)
        } else {
          console.error('Invalid pets data format:', data)
          setPets([])
        }
      } catch (err) {
        console.error('Error fetching pets:', err)
        setError(err.message)
        setPets([])
      } finally {
        setLoading(false)
      }
    }

    fetchPets()
  }, [type]) // Re-fetch when type changes

  return (
    <div className="pt-16 pb-24 w-full max-w-screen-xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">
        {type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Pets Available for Adoption` : 'All Pets Available for Adoption'}
      </h1>
      
      <FilterButtons activeType={type || 'all'} />
      
      {loading ? (
        <div className="text-center py-10">Loading pets...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          Error: {error}
        </div>
      ) : (
        <PetGrid pets={pets} />
      )}
    </div>
  )
}

export default AllPetsPageClient
