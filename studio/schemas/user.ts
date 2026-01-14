import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'isAdmin',
      title: 'Is Admin',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'url',
    }),
    defineField({
      name: 'password',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'emailVerified',
      type: 'datetime',
      hidden: true,
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'text',
    }),
  ],
})
