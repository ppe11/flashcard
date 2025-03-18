'use client'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import React from 'react'

const Pets = () => {
  return (
    <Tabs>
        <TabsList>
            <TabsTrigger></TabsTrigger>
            <TabsTrigger></TabsTrigger>
        </TabsList>
    </Tabs>
  )
}

export default Pets
