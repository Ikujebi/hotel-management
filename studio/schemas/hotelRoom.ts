import { defineType, defineField } from 'sanity'

const roomTypes = [
  { title: 'Basic', value: 'basic' },
  { title: 'Luxury', value: 'luxury' },
  { title: 'Suite', value: 'suite' },
]

export default defineType({
  name: 'hotelRoom',
  title: 'Hotel Room',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required().max(50),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required().min(100),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().min(100),
    }),
    defineField({
      name: 'discount',
      title: 'Discount',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'url', type: 'url' }),
            defineField({ name: 'file', type: 'file' }),
          ],
        },
      ],
      validation: Rule => Rule.required().min(3),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'object',
      fields: [
        defineField({ name: 'url', type: 'url' }),
        defineField({ name: 'file', type: 'file' }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Room Type',
      type: 'string',
      options: { list: roomTypes },
      initialValue: 'basic',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'specialNote',
      title: 'Special Note',
      type: 'text',
      initialValue:
        'Check-in time is 12:00 PM, checkout time is 11:59 AM.',
    }),
    defineField({
      name: 'dimension',
      title: 'Dimension',
      type: 'string',
    }),
    defineField({
      name: 'numberOfBeds',
      title: 'Number Of Beds',
      type: 'number',
      initialValue: 1,
      validation: Rule => Rule.min(1),
    }),
    defineField({
      name: 'offeredAmenities',
      title: 'Offered Amenities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icon', type: 'string' }),
            defineField({ name: 'amenity', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'isBooked',
      title: 'Is Booked',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'review' }] }],
    }),
  ],
})
