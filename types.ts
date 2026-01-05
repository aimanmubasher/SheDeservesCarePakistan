
import React from 'react';

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Partner {
  name: string;
  role: string;
  image?: string;
}

export interface Feature {
  title: string;
  titleUrdu: string;
  description: string;
  icon: React.ReactNode;
}