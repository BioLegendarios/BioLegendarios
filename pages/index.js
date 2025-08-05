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
