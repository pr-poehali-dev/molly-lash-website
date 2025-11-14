import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      title: 'Классическое наращивание',
      description: 'Натуральный эффект с одной ресничкой на каждую свою',
      price: '2500 ₽',
      duration: '2 часа'
    },
    {
      title: '2D-3D объём',
      description: 'Выразительный взгляд с несколькими ресничками',
      price: '3500 ₽',
      duration: '2.5 часа'
    },
    {
      title: 'Голливудский объём',
      description: 'Максимальная пышность и драматический эффект',
      price: '4500 ₽',
      duration: '3 часа'
    },
    {
      title: 'Коррекция',
      description: 'Обновление и заполнение выпавших ресничек',
      price: '1800 ₽',
      duration: '1.5 часа'
    }
  ];

  const portfolio = [
    'https://cdn.poehali.dev/projects/34d4cf83-e594-4342-8e7d-4f436b037972/files/d8a41ba1-1d3c-4e3c-b358-727fcd80361f.jpg',
    'https://cdn.poehali.dev/projects/34d4cf83-e594-4342-8e7d-4f436b037972/files/3da0c181-58b3-47d9-8ed7-c4000c79a177.jpg',
    'https://cdn.poehali.dev/projects/34d4cf83-e594-4342-8e7d-4f436b037972/files/deb2eb41-ea7c-42d1-a68a-ee69f1cbe98b.jpg'
  ];

  const reviews = [
    {
      name: 'Анна',
      text: 'Невероятная работа! Реснички держатся уже месяц и выглядят как в первый день. Молли — настоящий профессионал!',
      rating: 5
    },
    {
      name: 'Мария',
      text: 'Очень довольна результатом. Натуральный эффект, который я и хотела. Обязательно вернусь!',
      rating: 5
    },
    {
      name: 'Екатерина',
      text: 'Лучший мастер в городе! Аккуратная работа, приятная атмосфера. Рекомендую всем подругам.',
      rating: 5
    }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const handleBooking = () => {
    if (date && selectedTime) {
      alert(`Спасибо! Вы записаны на ${date.toLocaleDateString('ru-RU')} в ${selectedTime}`);
      setIsBookingOpen(false);
      setSelectedTime('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-serif">MOLLY LASH</h1>
          <div className="hidden md:flex gap-6">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a>
            <a href="#about" className="hover:text-primary transition-colors">О мастере</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </div>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Записаться онлайн
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">Онлайн-запись</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Выберите дату</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Выберите время</h3>
                  <ScrollArea className="h-[300px]">
                    <div className="grid grid-cols-2 gap-2 pr-4">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? 'default' : 'outline'}
                          onClick={() => setSelectedTime(time)}
                          className="w-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                  <Button
                    onClick={handleBooking}
                    disabled={!date || !selectedTime}
                    className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Подтвердить запись
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: Math.max(0, 1 - scrollY / 500)
          }}
        >
          <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div 
          className="container mx-auto text-center animate-fade-in relative z-10"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            Взгляд, который<br />очаровывает
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Профессиональное наращивание ресниц от сертифицированного мастера
          </p>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
            onClick={() => setIsBookingOpen(true)}
          >
            Записаться на процедуру
          </Button>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
            Услуги и прайс
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="animate-scale-in hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} />
                    <span>{service.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${(scrollY - 800) * 0.3}px)`
          }}
        >
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
            Портфолио
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.map((image, index) => (
              <div 
                key={index} 
                className="aspect-square overflow-hidden rounded-lg animate-scale-in"
                style={{
                  transform: `translateY(${(scrollY - 1000) * (0.05 * (index + 1))}px)`
                }}
              >
                <img
                  src={image}
                  alt={`Работа ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative py-20 px-4 bg-muted/30 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${(scrollY - 1400) * 0.15}px)`
          }}
        >
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
            О мастере
          </h2>
          <div className="text-center space-y-4">
            <p className="text-lg">
              Меня зовут Молли, и я профессиональный лэшмейкер с 5-летним опытом работы.
              Прошла обучение в лучших школах индустрии красоты и регулярно повышаю квалификацию.
            </p>
            <p className="text-lg">
              Использую только премиальные материалы от ведущих производителей.
              Каждая процедура проходит в комфортной атмосфере с соблюдением всех стандартов безопасности.
            </p>
            <div className="flex justify-center gap-8 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-muted-foreground">Довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5 лет</div>
                <div className="text-muted-foreground">Опыта работы</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-muted-foreground">Стерильность</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">
            Отзывы клиентов
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={20} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{review.text}</p>
                  <p className="font-semibold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">
            Контакты
          </h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Icon name="Phone" size={24} className="text-primary" />
              <a href="tel:+79991234567" className="text-xl hover:text-primary transition-colors">
                +7 (999) 123-45-67
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Icon name="Mail" size={24} className="text-primary" />
              <a href="mailto:info@mollylash.ru" className="text-xl hover:text-primary transition-colors">
                info@mollylash.ru
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Icon name="MapPin" size={24} className="text-primary" />
              <p className="text-xl">г. Москва, ул. Примерная, д. 10</p>
            </div>
            <div className="flex justify-center gap-4 pt-4">
              <Button variant="outline" size="lg" className="gap-2">
                <Icon name="Instagram" size={20} />
                Instagram
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Icon name="Send" size={20} />
                Telegram
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="font-serif text-xl mb-2">MOLLY LASH</p>
          <p>© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;