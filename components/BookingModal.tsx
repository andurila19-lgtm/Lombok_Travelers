'use client';

import { useState, useEffect } from 'react';
import packagesData from '@/data/packages.json';
import { TourPackage, Booking } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalizedPackage } from '@/lib/localization';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackageSlug?: string;
  packageSlug?: string;
  packageTitle?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  defaultPackageSlug,
  packageSlug,
  packageTitle,
}: BookingModalProps) {
  const { language, t } = useLanguage();
  const rawPackages: TourPackage[] = packagesData as TourPackage[];
  const packages = rawPackages.map((p) => getLocalizedPackage(p, language));

  const [customerName, setCustomerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [packageId, setPackageId] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [participants, setParticipants] = useState(2);
  const [pickupLocation, setPickupLocation] = useState('');
  const [transportation, setTransportation] = useState('Innova Reborn (Private AC)');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);

  // Set default selected package when modal opens or prop changes
  useEffect(() => {
    const targetSlug = packageSlug || defaultPackageSlug;
    if (targetSlug) {
      setPackageId(targetSlug);
    } else if (packages.length > 0 && !packageId) {
      setPackageId(packages[0].slug);
    }
  }, [packageSlug, defaultPackageSlug, isOpen]);

  // Reset form when modal closes
  const handleClose = () => {
    setSubmittedBooking(null);
    setErrorMsg('');
    setIsSubmitting(false);
    setHoneypot('');
    onClose();
  };

  if (!isOpen) return null;

  const selectedPkg = packages.find((p) => p.slug === packageId);
  const packageName = packageTitle || (selectedPkg ? selectedPkg.title : (packageId ? packageId : 'Custom Trip Lombok'));

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validations
    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMsg(t.bookingModal.errorName);
      return;
    }

    const cleanPhone = whatsapp.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 8 || cleanPhone.length > 18) {
      setErrorMsg(t.bookingModal.errorWa);
      return;
    }

    if (!travelDate) {
      setErrorMsg(t.bookingModal.errorDate);
      return;
    }

    if (travelDate < todayStr) {
      setErrorMsg(t.bookingModal.errorDatePast);
      return;
    }

    const paxNum = Number(participants) || 1;
    if (paxNum < 1 || paxNum > 100) {
      setErrorMsg(t.bookingModal.errorPax);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customer_name: customerName.trim(),
        whatsapp: whatsapp.trim(),
        email: email.trim(),
        package_id: packageId,
        package_name: packageName,
        travel_date: travelDate,
        participants: paxNum,
        pickup_location: pickupLocation.trim() || (language === 'en' ? 'Lombok International Airport (BIL)' : 'Bandara Internasional Lombok (BIL)'),
        transportation: transportation,
        notes: notes.trim(),
        hp_field: honeypot, // Honeypot verification
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success && json.data) {
        setSubmittedBooking(json.data);
      } else {
        const serverError = json.error || json.message || t.bookingModal.errorGeneral;
        setErrorMsg(serverError);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(t.bookingModal.errorGeneral);
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp click-to-chat formatted message
  const generateWaLink = (booking: Booking) => {
    const text = language === 'en'
      ? `Hello Lombok_Travelers,\n\nI would like to confirm my booking:\n\nBooking Ref: ${booking.booking_number}\nName: ${booking.customer_name}\nPackage: ${booking.package_name}\nDate: ${booking.travel_date}\nParticipants: ${booking.participants} Guests\nPickup: ${booking.pickup_location}\n\nPlease confirm availability and details.`
      : `Halo Lombok_Travelers,\n\nSaya ingin konfirmasi booking:\n\nNo. Booking: ${booking.booking_number}\nNama: ${booking.customer_name}\nPaket: ${booking.package_name}\nTanggal: ${booking.travel_date}\nPeserta: ${booking.participants} Orang\nPickup: ${booking.pickup_location}\n\nMohon konfirmasi ketersediaannya.`;
    return `https://wa.me/6283117110638?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="booking-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="booking-modal-box"
        style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '560px',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          animation: 'fadeInUp 0.3s ease-out',
          position: 'relative',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #185a38 0%, #002366 100%)',
            padding: '20px 24px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                background: 'rgba(255,255,255,0.2)',
                padding: '3px 8px',
                borderRadius: '4px',
                display: 'inline-block',
                marginBottom: '4px',
              }}
            >
              {t.bookingModal.systemBadge}
            </span>
            <h3 style={{ margin: 0, fontSize: '19px', fontWeight: 800, color: '#ffffff' }}>
              {submittedBooking ? t.bookingModal.titleSuccess : t.bookingModal.titleNew}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label={language === 'en' ? 'Close dialog' : 'Tutup form'}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#ffffff',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}
          >
            &times;
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <div style={{ padding: '24px', overflowY: 'auto' }}>
          {submittedBooking ? (
            /* =======================================================
               CONFIRMATION SCREEN AFTER SUBMISSION
               ======================================================= */
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#eaf4ee',
                  color: '#185a38',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  margin: '0 auto 16px auto',
                }}
              >
                <i className="fa fa-check"></i>
              </div>

              <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                {t.bookingModal.successTitle}
              </h4>
              <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '20px' }}>
                {language === 'en' ? 'Thank you ' : 'Terima kasih '}
                <strong>{submittedBooking.customer_name}</strong>. {t.bookingModal.successSubtitle}
              </p>

              {/* Unique Booking Code Badge */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '2px dashed #cbd5e1',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '20px',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
                  {t.bookingModal.refLabel}
                </span>
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    color: '#002366',
                    marginTop: '4px',
                  }}
                >
                  {submittedBooking.booking_number}
                </div>
                <div style={{ marginTop: '8px' }}>
                  <span
                    style={{
                      background: '#eff6ff',
                      color: '#1d4ed8',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    {t.bookingModal.summaryStatus}
                  </span>
                </div>
              </div>

              {/* Booking Summary Card */}
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '16px',
                  textAlign: 'left',
                  fontSize: '13px',
                  marginBottom: '24px',
                }}
              >
                <h5 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '10px', fontSize: '14px' }}>
                  {language === 'en' ? 'Trip Details Summary:' : 'Ringkasan Perjalanan:'}
                </h5>
                <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '8px', color: '#334155' }}>
                  <span style={{ color: '#64748b' }}>{t.bookingModal.summaryPkg}</span>
                  <strong>{submittedBooking.package_name}</strong>

                  <span style={{ color: '#64748b' }}>{t.bookingModal.summaryDate}</span>
                  <span>{submittedBooking.travel_date}</span>

                  <span style={{ color: '#64748b' }}>{t.bookingModal.summaryPax}</span>
                  <span>{submittedBooking.participants} {language === 'en' ? 'Guests' : 'Orang'}</span>

                  <span style={{ color: '#64748b' }}>{language === 'en' ? 'Pickup Location:' : 'Lokasi Pickup:'}</span>
                  <span>{submittedBooking.pickup_location}</span>

                  <span style={{ color: '#64748b' }}>{language === 'en' ? 'Transportation:' : 'Transportasi:'}</span>
                  <span>{submittedBooking.transportation}</span>

                  {submittedBooking.notes && (
                    <>
                      <span style={{ color: '#64748b' }}>{language === 'en' ? 'Special Notes:' : 'Catatan Khusus:'}</span>
                      <span>{submittedBooking.notes}</span>
                    </>
                  )}
                </div>
              </div>

              {/* WhatsApp Action Button */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href={generateWaLink(submittedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px',
                    fontSize: '15px',
                    fontWeight: 700,
                    background: '#25d366',
                    color: '#ffffff',
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                >
                  <i className="fa fa-whatsapp" style={{ fontSize: '20px' }}></i> {t.bookingModal.btnWaConfirm}
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    background: 'transparent',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '10px',
                    fontSize: '13px',
                    color: '#64748b',
                    cursor: 'pointer',
                  }}
                >
                  {t.bookingModal.btnClose}
                </button>
              </div>
            </div>
          ) : (
            /* =======================================================
               BOOKING FORM
               ======================================================= */
            <form onSubmit={handleSubmit}>
              {/* Anti-Spam Bot Trap (Honeypot) */}
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true">
                <label htmlFor="hp_field_booking">Jangan isi bidang ini</label>
                <input
                  id="hp_field_booking"
                  type="text"
                  name="hp_field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {errorMsg && (
                <div
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#b91c1c',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    marginBottom: '16px',
                  }}
                >
                  {errorMsg}
                </div>
              )}

              {/* 1. Pilih Paket Wisata */}
              <div style={{ marginBottom: '14px' }}>
                <label
                  htmlFor="bk_package"
                  style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}
                >
                  {t.bookingModal.pkgLabel}
                </label>
                <select
                  id="bk_package"
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    color: '#1e293b',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                  }}
                  required
                >
                  {packages.map((pkg) => (
                    <option key={pkg.slug} value={pkg.slug}>
                      {pkg.title} ({pkg.duration})
                    </option>
                  ))}
                  {packageTitle && !packages.some((p) => p.slug === packageId) && (
                    <option value={packageId}>
                      {packageTitle}
                    </option>
                  )}
                  <option value="custom-trip">
                    {language === 'en' ? 'Custom Itinerary / Special Request' : 'Custom Itinerary / Request Khusus'}
                  </option>
                </select>
              </div>

              {/* 2. Customer Name & WhatsApp */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label
                    htmlFor="bk_name"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}
                  >
                    {t.bookingModal.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="bk_name"
                    placeholder={t.bookingModal.namePlaceholder}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="bk_wa"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}
                  >
                    {t.bookingModal.waLabel}
                  </label>
                  <input
                    type="tel"
                    id="bk_wa"
                    placeholder={t.bookingModal.waPlaceholder}
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* 3. Email & Tanggal Keberangkatan */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label
                    htmlFor="bk_email"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}
                  >
                    {t.bookingModal.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="bk_email"
                    placeholder={t.bookingModal.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="bk_date"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}
                  >
                    {t.bookingModal.dateLabel}
                  </label>
                  <input
                    type="date"
                    id="bk_date"
                    min={todayStr}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* 4. Jumlah Peserta & Transportasi */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label
                    htmlFor="bk_pax"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}
                  >
                    {t.bookingModal.paxLabel}
                  </label>
                  <input
                    type="number"
                    id="bk_pax"
                    min="1"
                    max="100"
                    value={participants}
                    onChange={(e) => setParticipants(Math.max(1, parseInt(e.target.value) || 1))}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="bk_transport"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}
                  >
                    {t.bookingModal.transportLabel}
                  </label>
                  <select
                    id="bk_transport"
                    value={transportation}
                    onChange={(e) => setTransportation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      backgroundColor: '#ffffff',
                      outline: 'none',
                    }}
                  >
                    <option value="Innova Reborn (Private AC)">
                      {language === 'en' ? 'Toyota Innova Reborn (Private AC)' : 'Innova Reborn (Private AC)'}
                    </option>
                    <option value="Avanza / Xenia (Family MPV)">
                      {language === 'en' ? 'Avanza / Xenia (Family MPV Budget)' : 'Avanza / Xenia (Hemat)'}
                    </option>
                    <option value="Toyota HiAce Commuter (12-14 Pax)">
                      {language === 'en' ? 'Toyota HiAce Commuter (12-14 Guests)' : 'Toyota HiAce Commuter (12-14 Pax)'}
                    </option>
                    <option value="Toyota HiAce Premio Luxury">Toyota HiAce Premio Luxury</option>
                    <option value="Toyota Fortuner VRZ">Toyota Fortuner VRZ (VIP 4WD)</option>
                    <option value="Tanpa Transport (Hotel Only)">
                      {language === 'en' ? 'No Transport (Hotel / Tour Only)' : 'Tanpa Transport (Paket Tertentu)'}
                    </option>
                  </select>
                </div>
              </div>

              {/* 5. Lokasi Pickup */}
              <div style={{ marginBottom: '14px' }}>
                <label
                  htmlFor="bk_pickup"
                  style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}
                >
                  {t.bookingModal.pickupLabel}
                </label>
                <input
                  type="text"
                  id="bk_pickup"
                  placeholder={t.bookingModal.pickupPlaceholder}
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              {/* 6. Catatan Khusus */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="bk_notes"
                  style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}
                >
                  {t.bookingModal.notesLabel}
                </label>
                <textarea
                  id="bk_notes"
                  rows={2}
                  placeholder={t.bookingModal.notesPlaceholder}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    resize: 'vertical',
                    outline: 'none',
                  }}
                ></textarea>
              </div>

              {/* CTA Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 800,
                  borderRadius: '8px',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {isSubmitting ? (
                  <>
                    <i className="fa fa-spinner fa-spin"></i> {t.bookingModal.btnSubmitting}
                  </>
                ) : (
                  <>
                    <i className="fa fa-calendar-check-o"></i> {t.buttons.bookNow}
                  </>
                )}
              </button>

              <p style={{ textAlign: 'center', fontSize: '11.5px', color: '#94a3b8', marginTop: '10px', marginBottom: 0 }}>
                <i className="fa fa-lock"></i> {t.bookingModal.termsText}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
