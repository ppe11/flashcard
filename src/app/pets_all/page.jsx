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
  const subType = searchParams.get('subType')

  useEffect(() => {
    async function fetchPets() {
      setLoading(true)
      setError(null)
      
      try {
        // Build the URL with the type and subType parameters if they exist
        let url = '/pets'
        const queryParams = new URLSearchParams()
        
        if (type) queryParams.set('type', type)
        if (subType) queryParams.set('subType', subType)
        
        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`
        }
        
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
  }, [type, subType]) // Re-fetch when type or subType changes

  // Determine page title based on type and subType
  let pageTitle = 'All Pets Available for Adoption'
  
  if (type) {
    if (type === 'scales-fins-other' && subType) {
      if (subType === 'reptile') {
        pageTitle = 'Reptiles Available for Adoption'
      }
      else if (subType === 'fish') {
        pageTitle = 'Fish Available for Adoption'
      }
      // Capitalize and pluralize the type for the title
      const typeName = type.charAt(0).toUpperCase() + type.slice(1)
      pageTitle = `${typeName}s Available for Adoption`
    }
  }

  return (
    <div className="pt-[10vh] pb-24 w-full max-w-screen-xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">
        {pageTitle}
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
