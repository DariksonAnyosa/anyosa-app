// Sistema de sonidos usando Web Audio API
export class CelebrationSounds {
  private static audioContext: AudioContext | null = null

  private static getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return this.audioContext
  }

  // Crear sonido de celebración básico
  static playTaskComplete(): void {
    if (typeof window === 'undefined') return

    try {
      const context = this.getAudioContext()
      
      // Frecuencias para un acorde de celebración
      const frequencies = [523.25, 659.25, 783.99] // C5, E5, G5
      
      frequencies.forEach((freq, index) => {
        const oscillator = context.createOscillator()
        const gainNode = context.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(context.destination)
        
        oscillator.frequency.setValueAtTime(freq, context.currentTime)
        oscillator.type = 'sine'
        
        // Envelope para hacer el sonido más musical
        gainNode.gain.setValueAtTime(0, context.currentTime)
        gainNode.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5)
        
        oscillator.start(context.currentTime + index * 0.1)
        oscillator.stop(context.currentTime + 0.5 + index * 0.1)
      })
    } catch (error) {
      console.log('Audio not supported, using visual feedback only')
    }
  }

  // Sonido épico para logros importantes
  static playAchievementUnlocked(): void {
    if (typeof window === 'undefined') return

    try {
      const context = this.getAudioContext()
      
      // Secuencia ascendente para logros
      const sequence = [
        { freq: 261.63, time: 0 },     // C4
        { freq: 329.63, time: 0.1 },   // E4
        { freq: 392.00, time: 0.2 },   // G4
        { freq: 523.25, time: 0.3 },   // C5
        { freq: 659.25, time: 0.4 },   // E5
      ]
      
      sequence.forEach(({ freq, time }) => {
        const oscillator = context.createOscillator()
        const gainNode = context.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(context.destination)
        
        oscillator.frequency.setValueAtTime(freq, context.currentTime + time)
        oscillator.type = 'triangle'
        
        gainNode.gain.setValueAtTime(0, context.currentTime + time)
        gainNode.gain.linearRampToValueAtTime(0.15, context.currentTime + time + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + time + 0.3)
        
        oscillator.start(context.currentTime + time)
        oscillator.stop(context.currentTime + time + 0.3)
      })
    } catch (error) {
      console.log('Audio not supported, using visual feedback only')
    }
  }

  // Sonido para racha de días
  static playStreakBonus(): void {
    if (typeof window === 'undefined') return

    try {
      const context = this.getAudioContext()
      
      // Sonido de racha - más agresivo y poderoso
      for (let i = 0; i < 3; i++) {
        const oscillator = context.createOscillator()
        const gainNode = context.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(context.destination)
        
        oscillator.frequency.setValueAtTime(440 + (i * 220), context.currentTime + i * 0.1)
        oscillator.type = 'sawtooth'
        
        gainNode.gain.setValueAtTime(0, context.currentTime + i * 0.1)
        gainNode.gain.linearRampToValueAtTime(0.08, context.currentTime + i * 0.1 + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + i * 0.1 + 0.2)
        
        oscillator.start(context.currentTime + i * 0.1)
        oscillator.stop(context.currentTime + i * 0.1 + 0.2)
      }
    } catch (error) {
      console.log('Audio not supported, using visual feedback only')
    }
  }

  // Sonido suave para interacciones
  static playClick(): void {
    if (typeof window === 'undefined') return

    try {
      const context = this.getAudioContext()
      const oscillator = context.createOscillator()
      const gainNode = context.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(context.destination)
      
      oscillator.frequency.setValueAtTime(800, context.currentTime)
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0, context.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.05, context.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1)
      
      oscillator.start(context.currentTime)
      oscillator.stop(context.currentTime + 0.1)
    } catch (error) {
      console.log('Audio not supported')
    }
  }
}