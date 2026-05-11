import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLocationStore = create(
  persist(
    (set) => ({
      pincode: '',
      locationName: '',
      isLoading: false,
      error: '',

      setPincode: (code) => set({ pincode: code }),
      
      fetchLocation: async (pincode) => {
        if (!pincode || pincode.trim() === '') return;
        
        set({ isLoading: true, error: '', pincode });
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&format=json`);
          const data = await response.json();

          if (data && data.length > 0) {
            // Keep only the city/area name instead of full address to fit in navbar
            const displayName = data[0].display_name;
            const shortName = displayName.split(',')[0]; 
            set({ locationName: shortName });
          } else {
            set({ error: 'Location not found', locationName: '' });
          }
        } catch (err) {
          set({ error: 'Failed to fetch location', locationName: '' });
          console.error(err);
        } finally {
          set({ isLoading: false });
        }
      },
      
      clearLocation: () => set({ pincode: '', locationName: '', error: '' })
    }),
    {
      name: 'farmiva-location-storage',
    }
  )
);

export default useLocationStore;
