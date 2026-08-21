import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CarCard } from '@/components/CarCard';
import { Button } from '@/components/ui/Button';

export function WishlistPage() {
  const { cars, wishlist } = useApp();
  const saved = wishlist.map((id) => cars.find((c) => c.id === id)).filter(Boolean) as typeof cars;

  return (
    <div className="container-px py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-white">Your Wishlist</h1>
        <p className="mt-1 text-sm text-ink-400">{saved.length} car{saved.length === 1 ? '' : 's'} saved. Your wishlist is stored on this device.</p>
      </div>

      {saved.length === 0 ? (
        <div className="card-surface flex flex-col items-center justify-center gap-3 py-20 text-center">
          <Heart size={40} className="text-ink-500" />
          <p className="font-display text-lg font-bold text-white">No saved cars yet</p>
          <p className="text-sm text-ink-400">Tap the heart icon on any car to save it here for later.</p>
          <Link to="/explore" className="mt-2">
            <Button>Browse Cars</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {saved.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
        </div>
      )}
    </div>
  );
}
