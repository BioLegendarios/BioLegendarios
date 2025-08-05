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
