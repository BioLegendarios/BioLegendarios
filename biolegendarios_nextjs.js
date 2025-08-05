// Proyecto base mejorado para BioLegendarios.LAT con Next.js + Vercel + rutas dinámicas pre-renderizadas

// Estructura:
// - pages/
//     - index.js
//     - frases/[autor]/[slug].js
// - data/frases.json
// - public/
//     - images/
// - next.config.js

// Archivo: data/frases.json
[
  {
    "autor": "will-smith",
    "nombre_autor": "Will Smith",
    "slug": "no-hay-razon-para-un-plan-b",
    "frase": "No hay razón para tener un plan B porque te distrae del plan A.",
    "tema": "exito-disciplina",
    "contexto": "Entrevista en TV, 2013",
    "descripcion": "Will Smith habla sobre el enfoque absoluto como clave para lograr objetivos."
  }
]

// Archivo: pages/index.js
import Link from 'next/link';
import frases from '../data/frases.json';

export default function Home() {
  return (
    <div>
      <h1>Frases Legendarias</h1>
      <ul>
        {frases.map((f, i) => (
          <li key={i}>
            <Link href={`/frases/${f.autor}/${f.slug}`}>{f.frase}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Archivo: pages/frases/[autor]/[slug].js
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'frases.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const frases = JSON.parse(jsonData);

  const paths = frases.map(f => ({
    params: { autor: f.autor, slug: f.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'frases.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const frases = JSON.parse(jsonData);

  const fraseData = frases.find(
    f => f.autor === params.autor && f.slug === params.slug
  );

  return { props: { fraseData } };
}

export default function Frase({ fraseData }) {
  if (!fraseData) return <p>Frase no encontrada</p>;

  return (
    <div>
      <h1>{fraseData.frase}</h1>
      <p><strong>Autor:</strong> {fraseData.nombre_autor}</p>
      <p><strong>Tema:</strong> {fraseData.tema.replace('-', ' ')}</p>
      <p><strong>Contexto:</strong> {fraseData.contexto}</p>
      <p>{fraseData.descripcion}</p>
      <p><a href="/">⬅️ Volver a frases</a></p>
    </div>
  );
}

// Archivo: next.config.js
module.exports = {
  reactStrictMode: true,
};
